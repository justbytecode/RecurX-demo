//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PaymentGateway is Ownable, ReentrancyGuard {
    IERC20 public monToken;
    mapping(address => bool) public authorizedMerchants;
    mapping(uint256 => PaymentLink) public paymentLinks;
    mapping(uint256 => SubscriptionPlan) public subscriptionPlans;
    mapping(address => mapping(uint256 => Subscription)) public subscriptions;
    
    uint256 public paymentLinkCounter;
    uint256 public subscriptionPlanCounter;
    uint256 public subscriptionCounter;

    struct PaymentLink {
        address merchant;
        uint256 amount;
        bool active;
        string description;
    }

    struct SubscriptionPlan {
        address merchant;
        uint256 amount;
        uint32 interval;
        bool active;
        string name;
    }

    struct Subscription {
        address subscriber;
        uint256 planId;
        uint256 startTime;
        uint256 lastPayment;
        bool active;
    }

    event MerchantAdded(address indexed merchant);
    event MerchantRemoved(address indexed merchant);
    event PaymentLinkCreated(uint256 indexed linkId, address indexed merchant, uint256 amount, string description);
    event PaymentProcessed(uint256 indexed linkId, address indexed payer, uint256 amount);
    event SubscriptionPlanCreated(uint256 indexed planId, address indexed merchant, uint256 amount, uint32 interval, string name);
    event Subscribed(address indexed subscriber, uint256 indexed planId, uint256 subscriptionId);
    event SubscriptionPaymentProcessed(uint256 indexed subscriptionId, address indexed subscriber, uint256 amount);
    event SubscriptionCancelled(uint256 indexed subscriptionId, address indexed subscriber);

    constructor(address _monToken) Ownable(msg.sender) {
        monToken = IERC20(_monToken);
    }

    function addMerchant(address merchant) external onlyOwner {
        require(merchant != address(0), "Invalid merchant address");
        require(!authorizedMerchants[merchant], "Merchant already authorized");
        authorizedMerchants[merchant] = true;
        emit MerchantAdded(merchant);
    }

    function removeMerchant(address merchant) external onlyOwner {
        require(authorizedMerchants[merchant], "Merchant not authorized");
        authorizedMerchants[merchant] = false;
        emit MerchantRemoved(merchant);
    }

    function createPaymentLink(uint256 amount, string calldata description) external nonReentrant {
        require(authorizedMerchants[msg.sender], "Not an authorized merchant");
        require(amount > 0, "Amount must be greater than 0");
        
        paymentLinkCounter++;
        paymentLinks[paymentLinkCounter] = PaymentLink({
            merchant: msg.sender,
            amount: amount,
            active: true,
            description: description
        });
        emit PaymentLinkCreated(paymentLinkCounter, msg.sender, amount, description);
    }

    function processPayment(uint256 linkId) external nonReentrant {
        PaymentLink storage link = paymentLinks[linkId];
        require(link.active, "Payment link inactive or does not exist");
        require(monToken.transferFrom(msg.sender, link.merchant, link.amount), "Token transfer failed");
        
        emit PaymentProcessed(linkId, msg.sender, link.amount);
    }

    function createSubscriptionPlan(uint256 amount, uint32 interval, string calldata name) external nonReentrant {
        require(authorizedMerchants[msg.sender], "Not an authorized merchant");
        require(amount > 0, "Amount must be greater than 0");
        require(interval > 0, "Interval must be greater than 0");
        
        subscriptionPlanCounter++;
        subscriptionPlans[subscriptionPlanCounter] = SubscriptionPlan({
            merchant: msg.sender,
            amount: amount,
            interval: interval,
            active: true,
            name: name
        });
        emit SubscriptionPlanCreated(subscriptionPlanCounter, msg.sender, amount, interval, name);
    }

    function subscribe(uint256 planId) external nonReentrant {
        SubscriptionPlan storage plan = subscriptionPlans[planId];
        require(plan.active, "Subscription plan inactive or does not exist");
        
        subscriptionCounter++;
        subscriptions[msg.sender][subscriptionCounter] = Subscription({
            subscriber: msg.sender,
            planId: planId,
            startTime: block.timestamp,
            lastPayment: block.timestamp,
            active: true
        });
        require(monToken.transferFrom(msg.sender, plan.merchant, plan.amount), "Initial payment failed");
        
        emit Subscribed(msg.sender, planId, subscriptionCounter);
        emit SubscriptionPaymentProcessed(subscriptionCounter, msg.sender, plan.amount);
    }

    function processSubscriptionPayment(uint256 subscriptionId, address subscriber) external nonReentrant {
        Subscription storage sub = subscriptions[subscriber][subscriptionId];
        require(sub.active, "Subscription inactive or does not exist");
        SubscriptionPlan storage plan = subscriptionPlans[sub.planId];
        require(plan.active, "Plan inactive");
        require(block.timestamp >= sub.lastPayment + plan.interval, "Payment not due yet");
        
        require(monToken.transferFrom(subscriber, plan.merchant, plan.amount), "Token transfer failed");
        sub.lastPayment = block.timestamp;
        
        emit SubscriptionPaymentProcessed(subscriptionId, subscriber, plan.amount);
    }

    function cancelSubscription(uint256 subscriptionId) external nonReentrant {
        Subscription storage sub = subscriptions[msg.sender][subscriptionId];
        require(sub.active, "Subscription inactive or does not exist");
        require(sub.subscriber == msg.sender || authorizedMerchants[msg.sender], "Not authorized");
        
        sub.active = false;
        emit SubscriptionCancelled(subscriptionId, msg.sender);
    }

    function deactivatePaymentLink(uint256 linkId) external {
        PaymentLink storage link = paymentLinks[linkId];
        require(link.merchant == msg.sender, "Not the merchant");
        require(link.active, "Payment link already inactive");
        link.active = false;
    }

    function deactivateSubscriptionPlan(uint256 planId) external {
        SubscriptionPlan storage plan = subscriptionPlans[planId];
        require(plan.merchant == msg.sender, "Not the merchant");
        require(plan.active, "Plan already inactive");
        plan.active = false;
    }
}