"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface AlertProps {
  title: string;
  message: string;
  isOpen?: boolean;
  onClose?: () => void;
}

function Alert({ title, message, isOpen = true, onClose }: AlertProps) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white backdrop-blur-md border border-slate-200 p-6 shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50">
          <DialogPrimitive.Title className="text-lg font-semibold text-slate-900 mb-2">
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="text-base text-slate-600 mb-6">
            {message}
          </DialogPrimitive.Description>

          <div className="flex justify-end">
            <DialogPrimitive.Close asChild>
              <button
                onClick={onClose}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-100 backdrop-blur-sm hover:bg-slate-200 px-4 font-medium text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                OK
              </button>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default Alert;
