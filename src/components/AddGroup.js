// import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from "react"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function AddGroup(props){
    const { control, handleSubmit, watch, reset, getValues} = useForm({
        defaultValues: {
          nameValue: '',
          cityValue: '',
          stateValue: '',
          descriptionValue: '',
          categoryValue: ''
        }
      });

    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState(null)
    const [alert, setAlert] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const states = ['','Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

    const style = {
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        textAlign: 'center',
        p: 4,
      };

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
          backgroundColor: purple[700],
        },
      }));

      useEffect(() => {
		fetch('http://127.0.0.1:8000/api/categories/')
		.then(response => {
			if(response.status > 400) {
			 displayAlert('error', 'Categories not found')
			 return;
			}
			return response.json();
		})
		.then(data => {
            const allCategories = data.categories.map(category => {
                return category.name
            })
			setCategories(allCategories)
		})
	},[])

    const displayAlert = (type, userMessage) => {
        if(type && userMessage) {
          setAlert(true)
          setType(type)
          setMessage(userMessage)
        } 
      }

    const onSubmit = () => {
        const formValues = getValues()
        props.addNewGroup(formValues)
        setShow(false)
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{'horizontal' : 'center', 'vertical' : 'top'}}
                open={alert}
                autoHideDuration={5000}
                onClose={() => setAlert(false)}
            >
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert svariant="filled" onClose={() => setAlert(false)} severity={type}>
                        {message}
                    </Alert>
                </Stack>
            </Snackbar>
            <Button 
                variant='contained' 
                onClick={handleShow}>
                + Create new group 
            </Button>

            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
            <Typography style={{marginBottom: '.8em'}} id="modal-modal-title" variant="h5" component="h2">
                Add New Group
            </Typography>
            <hr></hr>
            <div style={{height: '2em'}}></div>
            <div className='login-fields'>
                <form noValidate>
                <Controller
                    name="nameValue"
                    control={control}
                    render={({ 
                    field: { onChange, value },
                    fieldState: {error},
                    }) => (
                    <TextField onChange={onChange} value={value} error={!!error} helperText={error ? error.message : null} required fullWidth id="filled-basic" label="Group Name" variant="outlined" />
                    )}
                    rules={{
                    required: 'Group Name Required',
                    }}
                />
                <div style={{height: '1em'}}></div>
                <Controller
                    name="cityValue"
                    control={control}
                    render={({ field: { onChange, value}, fieldState: {error} }) => (
                    <TextField required  error={!!error} helperText={error ? error.message : null} onChange={onChange} value={value} fullWidth id="filled-basic" label="City" variant="outlined" />
                    )}
                    rules={{
                    required: 'City required'
                    }}
                />
                <div style={{height: '1em'}}></div>
                <Controller
                    name="stateValue"
                    control={control}
                    render={({ field: { onChange, value}, fieldState: {error} }) => (
                    <TextField select required error={!!error} helperText={error ? error.message : null} onChange={onChange} value={value} fullWidth id="filled-basic" label="State" variant="outlined">
                        {states.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                        )}
                    rules={{
                    required: 'State required'
                    }} />
                <div style={{height: '1em'}}></div>
                <Controller
                    name="descriptionValue"
                    control={control}
                    render={({ field: { onChange, value}, fieldState: {error} }) => (
                    <TextField required  error={!!error} helperText={error ? error.message : null} onChange={onChange} value={value} fullWidth id="filled-basic" label="Description" variant="outlined" />
                    )}
                    rules={{
                    required: 'Description required'
                    }}
                />
                <div style={{height: '1em'}}></div>
                <Controller
                    name="categoryValue"
                    control={control}
                    render={({ field: { onChange, value}, fieldState: {error} }) => (
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={categories}
                            renderInput={(params) => <TextField {...params} required label="Category" variant="outlined"/>}
                        />
                
                    )}
                    />
                    
                <div style={{height: '2em'}}></div>
                <ColorButton 
                    onClick={handleSubmit(onSubmit)} 
                    type="submit"
                    className='login-button' 
                    size="large" 
                    variant="contained"
                >
                    Create
                </ColorButton>
                    </form>
                </div>
            </Box>
            </Modal>
        </>

    )

}


