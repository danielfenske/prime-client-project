function UserCard({ user }) {
  return (
    <>
      <div className='userCard'>{JSON.stringify(user)}</div>
    </>
  );
}

export default UserCard;
