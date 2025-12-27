import { useEffect, useRef, useCallback } from 'react';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { assessmentsService } from '@/services/assessments';

export function useAntiCheat({ assessmentId, onTerminate }) {
  const { cheatStrikes, maxStrikes, addCheatStrike } = useAssessmentStore();
  const isFirstRender = useRef(true);

  const showWarningToast = useCallback((message) => {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = `
      fixed top-4 left-1/2 -translate-x-1/2 z-[9999]
      bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl
      animate-pulse font-medium text-center max-w-md
    `;
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-2xl">⚠️</span>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 5000);
  }, []);

  const logCheatEvent = useCallback(async (eventType, actionTaken) => {
    if (!assessmentId) return;

    try {
      await assessmentsService.logCheatEvent(assessmentId, eventType);
    } catch (error) {
      console.error('Failed to log cheat event:', error);
    }
  }, [assessmentId]);

  useEffect(() => {
    // Skip first render to avoid false positive
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'hidden') {
        const isTerminated = addCheatStrike();

        if (isTerminated) {
          await logCheatEvent('tab_switch', 'terminate');
          showWarningToast('⛔ Exam terminated due to multiple violations.');
          onTerminate?.();
        } else {
          const remaining = maxStrikes - (cheatStrikes + 1);
          await logCheatEvent('tab_switch', 'warning');
          showWarningToast(
            `Warning: Tab switching detected! ${remaining} more violation${remaining !== 1 ? 's' : ''} will terminate your exam.`
          );
        }
      }
    };

    const handleCopy = (e) => {
      e.preventDefault();
      showWarningToast('Copy is disabled during the assessment.');
      logCheatEvent('copy', 'warning');
    };

    const handlePaste = (e) => {
      e.preventDefault();
      showWarningToast('Paste is disabled during the assessment.');
      logCheatEvent('paste', 'warning');
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      showWarningToast('Right-click is disabled during the assessment.');
    };

    const handleKeyDown = (e) => {
      // Prevent common shortcuts
      if (
        (e.ctrlKey || e.metaKey) &&
        ['c', 'v', 'a', 'p', 's', 'u'].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        showWarningToast('Keyboard shortcuts are disabled during the assessment.');
      }

      // Prevent F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
        showWarningToast('Developer tools are disabled during the assessment.');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [assessmentId, cheatStrikes, maxStrikes, addCheatStrike, onTerminate, logCheatEvent, showWarningToast]);

  return { cheatStrikes, maxStrikes };
}

