import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { appContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, deleteUser, selectAdminPage } from '../../features/AdminPageFeature/slice/adminPageSlice';
import { operationSuccess } from '../../Shared';
import Loading from './Loading';

export default function DeletePopup() {

  const dispatch = useDispatch();

  const adminPage = useSelector(selectAdminPage);

  const {deletePopup,setDeletePopup,deleteId,item} = React.useContext(appContext)

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setDeletePopup(false);
  };

  const handleDelete = ()=>{
    if(item === 'post'){
      dispatch(deletePost({id:deleteId}));
    }else {
      dispatch(deleteUser({id:deleteId}));
    }
    setTimeout(()=>{
      setDeletePopup(false);
      window.location.reload();
    },[2000]);
  }

  React.useEffect(()=>{
    adminPage.deletePost.msg && operationSuccess("Problem Deleted")
  },[adminPage.deletePost.msg]);

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={deletePopup}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <strong>
            Are you sure you want to delete?
          </strong>
        </DialogTitle>
        {
          adminPage.deletePostLoading && <Loading/>
        }
        <DialogContent>
          <DialogContentText>
            Deleting this item is permenant and can't be reversed
          </DialogContentText>
          <DialogContentText>
            Deleting : {deleteId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleDelete} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}