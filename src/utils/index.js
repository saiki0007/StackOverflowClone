export function getApiUrl(point, params) {
  let res = `${point}?`;

  for (let key in params) {
    res += `${key}=${params[key]}&`;
  }
  return res += 'site=stackoverflow';
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function getShortenNumber(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'm';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(0) + 'k';
  }
  return number;
}

export function getDateFormat(secDate) {
  const date = new Date(secDate * 1000);
  const dateArr = date.toString().split(' ');
  let h = date.getHours(),
    m = date.getMinutes();
  
  return `${dateArr[1]} ${dateArr[2]}, ${date.getFullYear()} at ${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m} `;
}

export const mainSorts = [
  {field: "activity", label: "Active"},
  {field: "votes", label: "Votes"},
  {field: "creation", label: "Creation"},
];

export const usersSorts = [
  {field: "reputation", label: "Reputation"},
  {field: "creation", label: "Creation"},
  {field: "name", label: "Name"},
];

export const tagsSorts = [
  {field: "popular", label: "Popular"},
  {field: "activity", label: "Active"},
  {field: "name", label: "Name"},
];

export const onUpVote = (e) => {
  e.preventDefault();
  if (window.store.getState().auth.accessToken) {
    alert('Hey you are noob, take a good account!\nFor Up Vote you need min 20 reputation!');
  } else {
    alert('You are not authorized!');
  }
}

export const onDownVote = (e) => {
  e.preventDefault();
  if (window.store.getState().auth.accessToken) {
    alert('Hey you are noob, take a good account!\nFor Down Vote you need min 100 reputation!');
  } else {
    alert('You are not authorized!');
  }
}
