import React from "react";
import {Link, withRouter} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const isActive = (history,path) => {
    if(history.location.pathname === path){
        return {color:'#ff6d00', textDecoration: 'none'}
    }else{
        return {color:'#fafafa' , textDecoration: 'none'}
    }
}


function Menus({history}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar  position={"relative"}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>

                   <Link style={isActive(history,'/')} to="/">
                       <Button color="inherit">
                         Home
                       </Button>
                    </Link>
                    <Link style={isActive(history,'/signup')} to="/signup">
                        <Button color="inherit">
                           Sign Up
                        </Button>
                    </Link>
                    <Link style={isActive(history,'/signin')} to="/signin">
                        <Button color="inherit">
                            Sign In
                        </Button>
                    </Link>

                </Toolbar>
            </AppBar>
        </div>

    );
}

export default withRouter(Menus);