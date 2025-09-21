export const resolveMinUrl = (url: string) => {
  const segments = url.split('/');
  const name = segments.at(-1)!;
  segments.pop();
  segments.push('min', name);
  return '/public' + segments.join('/');
};

export const resolveMaxUrl = (url: string) => {
  const segments = url.split('/');
  const name = segments.at(-1)!;
  segments.pop();
  segments.push('max', name);
  return '/public' + segments.join('/');
};
