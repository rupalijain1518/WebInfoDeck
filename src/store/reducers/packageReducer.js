const initState = {
    packages: [
        {id: '1', name: 'aaa bbb ccc'},
        {id: '2', name: 'zzz xxx vvv '},
        {id: '3', name: 'ooo nnn mmm'}]
};
const packageReducer = (state = initState, action) =>{
    switch (action.type) {
        case 'CREATE_PACKAGE':
          console.log('create package', action.pack);
        }
        return state;
};

export default packageReducer;