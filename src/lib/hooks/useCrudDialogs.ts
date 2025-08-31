import { useState } from 'react';

export function useCrudDialogs() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState<string | null>(null);

  function startAdd() {
    setOpenAdd(true);
  }
  function startEdit(id: string) {
    setCurrentId(id);
    setOpenEdit(true);
  }
  function startDelete(id: string) {
    setCurrentId(id);
    setOpenDelete(true);
  }

  function resetAll() {
    setOpenAdd(false);
    setOpenEdit(false);
    setOpenDelete(false);
    setCurrentId(null);
    setLoadingText(null);
  }

  return {
    openAdd,
    openEdit,
    openDelete,
    currentId,
    loadingText,
    setLoadingText,
    startAdd,
    startEdit,
    startDelete,
    resetAll,
    closeAdd: () => setOpenAdd(false),
    closeEdit: () => setOpenEdit(false),
    closeDelete: () => setOpenDelete(false),
    clearCurrent: () => setCurrentId(null),
  };
}
