const daum = window.daum

function setDaumAddr({ setPost, setAddr, setExtraAddr }) {
  const width = 500
  const height = 600

  daum.postcode.load(function () {
    new daum.Postcode({
      oncomplete: function (data) {
        setPost(data.zonecode)

        if (data.userSelectedType === 'R') {
          setAddr(data.roadAddress)
          let tempExtraAddr = ''

          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            tempExtraAddr += data.bname
          }

          if (data.buildingName !== '' && data.apartment === 'Y') {
            tempExtraAddr +=
              tempExtraAddr !== ''
                ? ', ' + data.buildingName
                : data.buildingName
          }

          setExtraAddr(`(${tempExtraAddr})`)
        } else {
          setAddr(data.jibunAddress)
          setExtraAddr('')
        }
      },
    }).open({
      left: window.screen.width / 2 - width / 2,
      top: window.screen.height / 2 - height / 2,
    })
  })
}

export default setDaumAddr
