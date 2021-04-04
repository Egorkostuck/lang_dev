import CheckIt  from './AppGames/CheckIt';
import ListenSprint from './AppGames/ListenSprint';
import Select from './AppGames/Select';
import Speak from './AppGames/Speak';
import Sprint from './AppGames/Sprint';
import WriteIt from './AppGames/Writelt';
import PutIt from './AppGames/PutIt'


export default [
    {component: CheckIt, path: 'check-it'},
    {component: ListenSprint, path: 'sprint-listen-it'}, 
    {component: Select, path: 'select-it'},
    {component: Speak, path: 'speak-check-it'}, 
    {component: Sprint, path: 'sprint-it'}, 
    {component: WriteIt, path: 'write-it'},
    {component: PutIt, path: 'put-it'}
];