import Cookie from "js-cookie";

const __DEV__cleanFiltersCookies = (req, store) => {
  const cookiesCleanedKey = "th_dev_cuc";
  const cookiesCleaned = Cookie.get(cookiesCleanedKey);
  if (cookiesCleaned) {
    return;
  }

  const cookiesKeys = ["th_raf", "th_rpf"];
  cookiesKeys.forEach(cookieKey => {
    Cookie.remove(cookieKey);
  });

  Cookie.set(cookiesCleanedKey, true);

  store.dispatch('railwayAggregations/clearFilters')
  store.dispatch('railwayRequests/clearFilters')
};

export default function({ store, req }) {
  __DEV__cleanFiltersCookies(req, store)
}
