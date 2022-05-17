interface CounterState{
    data:number,
    title:string
}

const intitalState : CounterState = {
    data : 42,
    title : 'YARC (Yet another redux component)'
}
export default function counterReducer(state=intitalState, action:any){
    return state;
}