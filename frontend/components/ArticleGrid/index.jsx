import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Grow from '@material-ui/core/Grow';
import moment from 'moment';

const styles = theme => ({
  root: {
    padding: '0 12px',
    margin: '0 auto'
  },
  grid: {
    marginTop: 0
  },
  post: {
    position: 'relative',
    cursor: 'pointer',
    height: '100%',
    transition: 'background 0.3s ease-in-out',
    '&:hover,&:focus': {
      background: theme.palette.secondary.xlight,
      transition: 'background 0.3s ease-in-out',
      '& $link,& $date': {
        // color: 'white',
        // transition: 'color 0.3s ease-in-out'
      }
    }
  },
  link: {
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    transition: 'color 0.3s ease-in-out'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  date: {
    color: theme.palette.primary.light,
    transition: 'color 0.3s ease-in-out'
  },
  postTextContainer: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit * 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    background: 'rgba(255, 255, 255, 0.2)'
  }
});

let timeout = 100;
let counter = 1;
function incrimentTimeout() {
  if (counter % 20 === 0) {
    counter = 1;
  }
  timeout = counter < 20 ? 100 * counter : 100;
  counter++;
  return timeout;
}

class ArticleGrid extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.posts.length !== this.props.posts.length;
  }
  formatDateTime = dt => {
    return moment(dt).format('l');
  };
  render() {
    const { posts, classes } = this.props;
    const timeout = 100;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} className={classes.grid} alignItems="stretch">
          {posts &&
            posts.map((post, i) => (
              <Grow in timeout={incrimentTimeout()} key={post.id || post.title}>
                <Grid item xs={12} md={6} lg={4}>
                  <Card className={classes.post}>
                    <CardMedia className={classes.media} image={post.img} title="Post image" />
                    <CardContent>
                      <Typography gutterBottom variant="headline" component="h2">
                        {post.title}
                      </Typography>
                      <Typography component="p" gutterBottom>
                        {post.text}
                      </Typography>
                      <Typography >{post.author.name}</Typography>
                      <Typography variant="caption">
                        <small>{moment(post.createdAt).format('MMMM Do YYYY')}</small>
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grow>
            ))}
          {posts.length === 0 && (
            <Grid item xs={12}>
              <p>No items do display</p>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

ArticleGrid.propTypes = {
  posts: PropTypes.array.isRequired
};

export default withStyles(styles)(ArticleGrid);
