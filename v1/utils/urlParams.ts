const parseUrlParams = <TParams>(params: TParams): URLSearchParams => {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    urlParams.set(key, value);
  });
  return urlParams;
};

export default parseUrlParams;
