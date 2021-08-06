export const fetchData = (data) => {
  return fetch(`${process.env.PUBLIC_URL}/data/${data}.json`).then((res) =>
    res.json()
  )
}
