<template></template>

<script>
import MSALInstance from '@/auth/auth';
export default {
    name: 'Login',
    mounted() {
        MSALInstance.login();
    },
};
</script>
