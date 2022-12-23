# store

[Redux Toolkit](https://redux-toolkit.js.org/)

## Snippets

### Select values

```
import { useSelector } from 'react-redux';
import { selectExampleState } from '@gui/reducers'

const Test = () => {
  const example = useSelector(selectExampleState);
}
```

### Dispatch values

```
import { useDispatch } from 'react-redux';
import { setExampleValue } from '@gui/reducers';

const Test = () => {
  const dispatch = useDispatch();
  dispatch(setExampleValue(1));
}
```

### Both

```
import { useSelector, useDispatch } from 'react-redux'
import { selectExampleState, setExampleValue } from '@gui/reducers'

const Test = () => {
  const { value } = useSelector(selectExampleState);
  const dispatch = useDispatch();
  dispatch(setExampleValue(1));
}
```
