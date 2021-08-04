export const fetchData = () => {
  return fetch(`${process.env.PUBLIC_URL}/data/users.json`).then((res) =>
    res.json()
  )
}
