<template>
    <div class="container">
        <div class="card card-dark mt-5">
            <div class="card-header ">
                <h3 class="card-title">Users Table</h3>
                <div class="card-tools">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    <i class="fas fa-user-plus yellow"></i>
                        Add User
                    </button>
                </div>
            </div>

            <!-- /.card-header -->
            <div class="card-body">
                <div id="example1_wrapper" class="dataTables_wrapper dt-bootstrap4">
                    <div class="row">

                            <table id="example1" class="table table-striped dataTable" role="grid" aria-describedby="example1_info">
                    <thead>
                    <tr role="row">
                        <th class="sorting_asc">ID</th>
                        <th class="sorting">Name</th>
                        <th class="sorting">Email</th>
                        <th class="sorting">Type</th>
                        <th class="sorting">Date</th>
                        <th class="sorting">Modify</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr role="row" class="odd" v-for="user in users" :key="user.id">
                        <td class="sorting_1">{{user.id}}</td>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.type | uptext}}</td>
                        <td>{{user.created_at | mydate}}</td>
                        <td>
                            <a href="#"><i class="fa fa-edit blue"></i></a>|
                            <a href="#"><i class="fas fa-trash red"></i></a>
                        </td>
                    </tr>
                   </tbody>
                </table>
                </div>
                </div>
            </div>
            <!-- /.card-body -->
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <form @submit.prevent="createuser">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                            <div class="form-group">
                                <input v-model="form.name" type="text" name="name" placeholder="Username"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.email" type="email" name="email" placeholder="Email"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.password" type="password" name="password" placeholder="Password"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>
                            </div>
                            <div class="form-group">
                                <textarea v-model="form.bio" rows="1" name="bio" placeholder="Bio"
                                          class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>
                            <div class="form-group">
                                <select v-model="form.type" name="type"
                                        class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                    <option value="">select user role</option>
                                    <option value="admin">Admin</option>
                                    <option value="author">Author</option>
                                    <option value="user">User</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data(){
            return{
                users:{},
                form:new Form({
                    name:    '',
                    email:   '',
                    password:'',
                    bio:     '',
                    type:    '',
                    photo:   ''
                })
            }
        },
        methods: {
            createuser(){
                this.$Progress.start()
                this.form.post('api/user')
                    .then(()=>{
                        fire.$emit('aftercreated')
                        $('#exampleModal').hide()
                        toast({
                            type: 'success',
                            title: 'User created successfully'
                        })
                        this.$Progress.finish()
                    })
                    .catch()

            },
            loaduser(){
                axios.get('api/user').then(({data})=>{this.users = data.data})
            }
        },
        created() {

            this.loaduser()
            fire.$on('aftercreated',()=>{
                this.loaduser()
            })

        }
    }
</script>
