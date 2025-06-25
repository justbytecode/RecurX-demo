"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../ui/alert-dialog";
import { usePrivy } from "@privy-io/react-auth";

export default function PopupSequence() {
  const { authenticated, user } = usePrivy();
  const [popupMessage, setPopupMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (authenticated && user?.wallet?.address && !hasShown) {
      // Show first message
      setPopupMessage("You earned 250 points!");
      setShowPopup(true);
      setHasShown(true);

      const timer1 = setTimeout(() => {
        setPopupMessage("You're in the wishlist!");
      }, 4000); // Increased time to read first message

      const timer2 = setTimeout(() => {
        setShowPopup(false);
        setPopupMessage(null);
      }, 8000); // Increased total time to read both messages

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [user, authenticated]);

  return (
    <AlertDialog open={showPopup} onOpenChange={setShowPopup}>
      <AlertDialogContent className="text-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            {popupMessage}
          </AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
