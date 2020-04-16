import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(300),
            height: theme.spacing(40),
        },
    },
}));

const Layout=  ({title="Title",description="Description",className,children}) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <Paper elevation={7} style={{backgroundColor:'#b2ebf2'}}>
                    <Typography variant="h2"  gutterBottom style={{padding:40}}>
                        {title}
                    </Typography>
                    <Typography variant="overline" display="block" style={{marginLeft:'45px'}}gutterBottom>
                        {description}
                    </Typography>
                </Paper>
             </div>
            <div className={className}>{children}</div>
        </div>
    );
}

export default Layout;