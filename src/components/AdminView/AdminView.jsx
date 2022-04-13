import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

function AdminView() {
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <Button variant='contained'>Add User</Button>
        <h1>Hello From the Admin View</h1>
      </div>
    </>
  );
}

export default AdminView;
