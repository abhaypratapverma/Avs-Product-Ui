// src/components/common/ConfirmModal.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../atoms/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  danger = false,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />
          <motion.div
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white rounded-t-[20px] z-50 p-6 shadow-2xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-10 h-1 bg-border rounded-full" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg text-center">{title}</h3>
            <p className="text-muted text-sm text-center mt-2 leading-relaxed">{message}</p>
            <div className="flex flex-col gap-3 mt-6">
              <Button
                variant={danger ? 'danger' : 'primary'}
                fullWidth
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
              <Button variant="ghost" fullWidth onClick={onCancel}>
                {cancelLabel}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
