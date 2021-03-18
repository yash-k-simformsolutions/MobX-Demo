import Users from '../components/Users.json';
import { observable } from 'mobx';

const Store = observable({
    users: Users
})

export default Store;