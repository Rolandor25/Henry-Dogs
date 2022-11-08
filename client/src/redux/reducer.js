//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW
// REDUCER
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW
const initialState={
    Dogs:[], //LISTAS
    Dog:[],
    Pages:[],
    AllDogs: [],
    Temper: [],
    Temperlist:[]
}
export default function rootReducer(state=initialState,action){
    switch (action.type) {
        case 'DOGS_LIST':
            return{
                ...state,
                AllDogs:action.payload,
                Dogs:action.payload,
            }
        case 'DOG':
            return{
                ...state,
                Dog:action.payload
            }      
        case 'TEMPER':
            return{
                ...state,
                Temper:action.payload
            }     
        case 'SBN':
            let DogSortN = [...state.Dogs]  
            DogSortN = action.payload === 'A' ?
            state.Dogs.sort(function(a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            }) :
            state.Dogs.sort(function(a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 0;
            });          
            return {
              ...state,
              Dogs: DogSortN
            };    
        case 'SBW':
            let DogSortW = [...state.Dogs]       
            DogSortW = action.payload === 'L' ?
            state.Dogs.sort(function(a, b) {
                if (a.weight > b.weight) return 1;
                if (a.weight < b.weight) return -1;
                return 0;
            }) :
            state.Dogs.sort(function(a, b) {
                //Weight to val A
                    let SA2=0
                    let SA1=a.weight.indexOf('-')
                    if (SA1<0) {
                        SA2=parseInt(a.weight.trim())
                    }else{
                        SA2=parseInt(a.weight.slice(0,SA1-1) )
                    }
                //Weight to val B
                    let SB2=0
                    let SB1=b.weight.indexOf('-')
                    if (SB1<0) {
                        SB2=parseInt(b.weight.trim())
                    }else{
                        SB2=parseInt(b.weight.slice(0,SB1-1) )
                    }
                //ORDENAMIENTO CON NUMERO INCIAL DE PESO
                if (SA2 < SB2) return 1;
                if (SA2 > SB2) return -1;
                return 0;
            });          
            return {
                ...state,
                Dogs: DogSortW
            };  
        case 'TEMPFILTER':
            var All_Dogs= [...state.AllDogs];   
            var DogFilter=[] 
            for (let d = 0; d < All_Dogs.length; d++) {
                if (All_Dogs[d].temperament!==undefined){
                    let coincidencce = All_Dogs[d].temperament.includes(action.payload)
                    if (coincidencce) {
                        DogFilter.push({
                            id:All_Dogs[d].id,
                            image:All_Dogs[d].image ,
                            name:All_Dogs[d].name,
                            weight:All_Dogs[d].weight,
                            temperament:All_Dogs[d].temperament
                        })
                    }
                }
            }                
            return {
              ...state,
              Dogs: DogFilter,
            };  
        case 'SEARCH_DOGS':
            return {
                ...state,
                Dogs: action.payload,
            };                                                                                      
        default:
            return {...state}
    }            
}