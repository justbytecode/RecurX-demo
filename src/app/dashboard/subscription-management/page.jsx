'use client';

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { useTheme } from "../../../context/themeContext";
import { useState, useTransition } from "react";
import { 
  PlusCircle, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";

function Page({ existingPlans, createSubscriptionPlan }) {
  const { themeClasses } = useTheme();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    interval: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData(e.target);
    
    startTransition(async () => {
      try {
        const result = await createSubscriptionPlan(formDataObj);
        if (result.success) {
          // Reset form
          setFormData({ name: '', description: '', amount: '', interval: '' });
          console.log(result.message);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error creating subscription plan:", error);
      }
    });
  };

  const stats = [
    {
      title: "Total Plans",
      value: 1000,
      icon: Package,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Active Subscribers", 
      value: 1230,
      icon: Users,
      change: "+8%",
      changeType: "positive"
    },
    {
      title: "Monthly Revenue",
      value: "$2,847",
      icon: DollarSign,
      change: "+23%",
      changeType: "positive"
    },
    {
      title: "Conversion Rate",
      value: "12.5%",
      icon: TrendingUp,
      change: "-2%",
      changeType: "negative"
    }
  ];

  return (
    <div className={`flex-1 p-8 ${themeClasses.background}`}>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className={`text-3xl font-bold ${themeClasses.textPrimary}`}>
            Subscription Management
          </h1>
          <Badge variant="outline" className="px-3 py-1">
            <Clock className="w-4 h-4 mr-1" />
            Monad Testnet
          </Badge>
        </div>
        <p className={`${themeClasses.textSecondary} text-lg`}>
          Create and manage your subscription plans on the blockchain
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className={`${themeClasses.cardBackground} ${themeClasses.cardBorder} border`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${themeClasses.cardBackground}`}>
                  <stat.icon className={`w-6 h-6 ${themeClasses.textSecondary}`} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className={`text-sm ${themeClasses.textMuted} ml-1`}>
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create New Plan */}
        <div className="lg:col-span-1">
          <Card className={`${themeClasses.cardBackground} ${themeClasses.cardBorder} border`}>
            <CardHeader>
              <CardTitle className={`flex items-center ${themeClasses.textPrimary}`}>
                <PlusCircle className="w-5 h-5 mr-2" />
                Create New Plan
              </CardTitle>
              <CardDescription className={themeClasses.textSecondary}>
                Set up a new subscription plan for your customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${themeClasses.textPrimary}`}>
                    Plan Name
                  </label>
                  <Input
                    name="name"
                    placeholder="e.g., Premium Monthly"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={themeClasses.input}
                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${themeClasses.textPrimary}`}>
                    Description
                  </label>
                  <Input
                    name="description"
                    placeholder="Brief description of the plan"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className={themeClasses.input}
                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${themeClasses.textPrimary}`}>
                    Amount (MON)
                  </label>
                  <Input
                    name="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    className={themeClasses.input}
                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${themeClasses.textPrimary}`}>
                    Billing Interval (days)
                  </label>
                  <Input
                    name="interval"
                    type="number"
                    placeholder="30"
                    required
                    value={formData.interval}
                    onChange={(e) => setFormData(prev => ({ ...prev, interval: e.target.value }))}
                    className={themeClasses.input}
                  />
                </div>

                <Button type="submit" className="w-full mt-6" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Plan...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Create Subscription Plan
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Existing Plans */}
        <div className="lg:col-span-2">
          <Card className={`${themeClasses.cardBackground} ${themeClasses.cardBorder} border`}>
            <CardHeader>
              <CardTitle className={`flex items-center ${themeClasses.textPrimary}`}>
                <Package className="w-5 h-5 mr-2" />
                Your Subscription Plans
              </CardTitle>
              <CardDescription className={themeClasses.textSecondary}>
                Manage your existing subscription plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              {[].length === 0 ? (
                <div className="text-center py-12">
                  <Package className={`w-12 h-12 mx-auto ${themeClasses.textMuted} mb-4`} />
                  <h3 className={`text-lg font-medium ${themeClasses.textPrimary} mb-2`}>
                    No subscription plans yet
                  </h3>
                  <p className={`${themeClasses.textSecondary} mb-4`}>
                    Create your first subscription plan to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {existingPlans.map((plan, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${themeClasses.cardBorder} ${themeClasses.hover} transition-colors`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                          <h4 className={`font-semibold ${themeClasses.textPrimary}`}>
                            {plan.name}
                          </h4>
                        </div>
                        <Badge variant="secondary">
                          {plan._count?.subscriptions || 0} subscribers
                        </Badge>
                      </div>
                      
                      {plan.description && (
                        <p className={`${themeClasses.textSecondary} text-sm mb-3`}>
                          {plan.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <DollarSign className={`w-4 h-4 ${themeClasses.textMuted} mr-1`} />
                            <span className={`font-medium ${themeClasses.textPrimary}`}>
                              {plan.amount} MON
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className={`w-4 h-4 ${themeClasses.textMuted} mr-1`} />
                            <span className={`text-sm ${themeClasses.textSecondary}`}>
                              Every {plan.interval} days
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Info Card */}
      <Card className={`mt-8 ${themeClasses.cardBackground} ${themeClasses.cardBorder} border`}>
        <CardContent className="p-6">
          <div className="flex items-start">
            <AlertCircle className={`w-5 h-5 ${themeClasses.textMuted} mr-3 mt-0.5`} />
            <div>
              <h4 className={`font-medium ${themeClasses.textPrimary} mb-1`}>
                About Blockchain Subscriptions
              </h4>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Your subscription plans are deployed as smart contracts on the Monad testnet. 
                Once created, plan parameters cannot be modified, but you can create new plans 
                and migrate subscribers as needed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


export default Page