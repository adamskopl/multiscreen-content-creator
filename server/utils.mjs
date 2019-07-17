export function arrayIsSubset(superset, subset) {
  let isSubset = true;
  subset.forEach((subEl) => {
    if (!superset.includes(subEl)) { isSubset = false; }
  });
  return isSubset;
}
