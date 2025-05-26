useEffect() => React hook that tells DO SOME CODE WHIN:
    1- This component re-renders.
    2- This component mounts.
    3- The state of a value.

useEffect(function, [dependencies])

1. useEffect(() => {})  // Runs after every re-render
2. useEffect(() => {}, []) // Runs only on mount
3. useEffect(() => {}, [value]) // Rund on mount + when value changes

WHEN TO USE ?

1- Event Listenres
2- DOM manipulations 
3- Subsciption (real-time updates)
4- Fetching data from an API
5- Clean up when a component unmounts

