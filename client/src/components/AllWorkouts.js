import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import { MyConsumer } from './MyContext';
import { useState } from 'react';

function AllWorkouts() {
  const [expand, setExpand] = useState(false);
  const [newLift, setNewLift] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newReps, setNewReps] = useState('');
  const [newDate, setNewDate] = useState('');
  const [liftId, setLiftId] = useState('');
  const [userLiftId, setUserLiftId] = useState('');
  const [workoutId, setWorkoutId] = useState('');
  const [failed, setFailed] = useState(false);

  // TODO: Have one page (probably this one) for editing old workouts. Make a form that autofills with the set you click on,
  // then have an update and delete for it.

  // but ALSO get ready to have a separate page that tracks your Dates in a meaningful way. That won't be easy to actually
  // map with anything until you get some decent seed data in there, but it'll be doable. You got this!

  // TODO: make delete button that changes to update if you change anything on the form

  function fillForm(workout) {
    console.log(workout);
    setNewLift(workout.name);
    setNewWeight(workout.weight);
    setNewReps(workout.reps);
    setNewDate(workout.date);
    setLiftId(workout.lift_id);
    setWorkoutId(workout.workout_id);
    setUserLiftId(workout.user_lift_id);
  }

  return (
    <MyConsumer>
      {(context) => (
        <>
          <Button variant="contained">
            <Link to="/">Back to home</Link>
          </Button>
          {context.workouts.map((workout, index) => (
            <div key={`div ${index}`}>
              <Button
                onClick={(e) => {
                  context.expandWorkout(workout.id);
                  setExpand((expand) => !expand);
                }}
                key={`date ${index}`}
              >
                {workout.date}
              </Button>
            </div>
          ))}
          <Box>
            <TextField
              value={newLift}
              label="Lift"
              name="Lift"
              onChange={(e) => setNewLift(e.target.value)}
            />
            <TextField
              value={newWeight}
              label="Weight"
              name="Weight"
              onChange={(e) => setNewWeight(e.target.value)}
            />
            <TextField
              value={newReps}
              label="Reps"
              name="Reps"
              onChange={(e) => setNewReps(e.target.value)}
            />
            <TextField
              value={newDate}
              label="Date"
              name="Date"
              onChange={(e) => setNewDate(e.target.value)}
            />
            <Button
              onClick={() =>
                context.onUpdateUserLift(
                  userLiftId,
                  liftId,
                  workoutId,
                  newWeight,
                  newReps
                )
              }
            >
              Update
            </Button>
            <Button onClick={() => context.onDeleteUserLift(userLiftId)}>
              Delete
            </Button>
          </Box>
          {expand &&
            context.workoutData.map((workout) => (
              <Card
                onClick={() => fillForm(workout)}
                key={workout.id}
                variant="outlined"
                sx={{ maxWidth: 175 }}
              >
                <CardContent>
                  <Typography>{workout.name}</Typography>
                  <Typography>{workout.weight} lbs</Typography>
                  <Typography>{workout.reps} reps</Typography>
                </CardContent>
              </Card>
            ))}
        </>
      )}
    </MyConsumer>
  );
}

export default AllWorkouts;
