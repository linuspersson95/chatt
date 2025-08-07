import { create } from 'zustand';

type Dialogs = 'languageSelector';

type DialogOpen = {
  [x in Dialogs]: boolean;
};

type DialogStoreState = {
  dialog: DialogOpen;
  setDialogOpen: (dialog: Dialogs) => void;
  setDialogClose: (dialog: Dialogs) => void;
};

export const useDialogStore = create<DialogStoreState>((set) => ({
  dialog: { languageSelector: false },
  setDialogClose: (dialog) => set({ dialog: { [dialog]: false } }),
  setDialogOpen: (dialog) => set({ dialog: { [dialog]: true } }),
}));
