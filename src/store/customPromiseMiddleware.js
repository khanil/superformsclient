export default customPromiseMiddleware(client) {
  return ({dispatch, getState}) => next => action => {
    if (typeof(action) == 'function')
      return next(action); //pass to thunk middleware

    const { promise, types, ...rest } = action;
    if (!promise)
      return next(action); //pass to next middleware

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({...rest, type: REQUEST}); //dispatch action init

    const actionPromise = promise();
    actionPromise.then(
      (result) => next({...rest, result, type: SUCCESS}),
      (error) => next({...rest, error, type: FAILURE})
    ).catch((error) => {
      console.error('MIDDLEWARE ERROR:', error);
      next({...rest, error, type: FAILURE})
    });

    return actionPromise;
  }
}

export default customPromiseMiddleware;