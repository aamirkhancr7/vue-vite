<template>
    <div>
        <div>The Mainlayout</div>
        <button @click.stop="logout">Logout</button>
        <button @click.stop="call">cal</button>
    </div>
</template>

<script>
import MSALInstance from '@/auth/auth';
import { usersAPI } from '@/api';

export default {
    name: 'MainLayout',
    methods: {
        logout() {
            return MSALInstance.logout();
        },
        call() {
            usersAPI.getCurrentUserAPI();
        },
    },
};
</script>
