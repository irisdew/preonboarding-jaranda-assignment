import auth from 'Utils/Auth/Auth'
import styled from 'styled-components/macro'
import userImg from 'Assets/Images/profile-user.png'
import { authType } from 'Constant'

export function UserProfile() {
  return (
    <UserContainer>
      <ProfileImgBox>
        <ProfileImg src={userImg} alt="user" />
      </ProfileImgBox>
      <Name>{auth.getAuth().name} 님</Name>
      <Role>
        {auth.getAuth().auth === authType.TEACHER.name
          ? authType.TEACHER.desc
          : auth.getAuth().auth === authType.PARENT.name
          ? authType.PARENT.desc
          : authType.STUDENT.desc}
      </Role>
    </UserContainer>
  )
}

export const UserContainer = styled.div`
  background-color: #fff;
  margin: 50px 10px;
  border: solid 1.5px;
  border-radius: 10px;
  min-width: 200px;
  min-height: 220px;
  padding: 35px;
  text-align: center;
  @media screen and ${({ theme }) => theme.device.tablet} {
    padding: 20px;
    height: 1.5vw;
    min-width: 230px;
    min-height: 200px;
  }
`
const ProfileImgBox = styled.div`
  display: flex;
  justify-content: center;
`
const ProfileImg = styled.img`
  max-width: 70px;
`

const Name = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
`
const Role = styled.div`
  margin-top: 10px;
  font-size: 15px;
  font-weight: 600;
`
