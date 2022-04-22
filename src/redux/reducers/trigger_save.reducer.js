function triggerSave(state = true, action) {

  if (action.type === 'TRIGGER_ITEM_SAVE') {
    return !state;
  }

  return state;
}

export default triggerSave;