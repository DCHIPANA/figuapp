<template>
    <q-layout view="hHh lpr fFf">
        <q-page-container>
            <q-page class="flex flex-center" style="background: #0a0e1a">
                <div class="text-center">
                    <div class="text-h2 text-primary text-weight-black">404</div>
                    <div class="text-subtitle1 text-grey-5 q-mb-lg">Página no encontrada</div>
                    <q-btn unelevated color="primary" text-color="black" label="Ir al inicio"
                        @click="$router.push('/inicio')" />
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
