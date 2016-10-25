export default function onRouteLeave(router, route, dirty) {
  router.setRouteLeaveHook(route, () => {
    if (dirty) {
      return 'You have unsubmitted changes, are you sure you want to leave?';
    }
    return null;
  });
}
