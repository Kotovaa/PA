<template>
    <transition tag="div" name="fade">
        <div v-if="show" class="dashboard-pagination">
            <ul>
                <li
                    v-if="current > first"
                    :class="['prev-page']"
                    @click="prevPage"
                >
                    {{ prevLabel }}
                </li>
                <template>
                    <template v-if="hasLeftOffset">
                        <li @click="firstPage">
                            {{ first }}
                        </li>
                        <li class="disabled">...</li>
                    </template>
                    <li
                        v-for="page in pages"
                        :class="{'current-page': page === current}"
                        @click="toPage(page)"
                    >
                        {{ page }}
                    </li>
                    <template v-if="hasRightOffset">
                        <li class="disabled">...</li>
                        <li @click="lastPage">
                            {{ last }}
                        </li>
                    </template>
                </template>
                <li
                    v-if="current < last"
                    :class="['next-page']"
                    @click="nextPage"
                >
                    {{ nextLabel }}
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'dashboard-pagination',
        props: {
            first: {
                type: Number,
                default: 1
            },
            last: {
                type: Number,
                default: 1
            },
            current: {
                type: Number,
                default: 1
            },
            offset: {
                type: Number,
                default: 4
            },
            prevLabel: {
                type: String,
                default: 'Предыдущая'
            },
            nextLabel: {
                type: String,
                default: 'Следующая'
            }
        },
        data () {
            return {};
        },
        computed: {
            show () {
                return this.first < this.last;
            },
            hasLeftOffset () {
                return (this.current - this.offset) > this.first + 1;
            },
            hasRightOffset () {
                return (this.current + this.offset) < this.last - 1;
            },
            pages () {
                let start = this.first;
                let end = this.last;
                let pages = [];

                if (this.hasLeftOffset) start = this.current - this.offset;
                if (this.hasRightOffset) end = this.current + this.offset;

                for (let i = start; i <= end; i++) pages.push(i);

                return pages;
            }
        },
        methods: {
            prevPage () {
                this.$emit('change', this.current - 1);
            },
            nextPage () {
                this.$emit('change', this.current + 1);
            },
            firstPage () {
                this.$emit('change', this.first);
            },
            lastPage () {
                this.$emit('change', this.last);
            },
            toPage (page) {
                this.$emit('change', page);
            },
        }
    }
</script>

<style lang="scss">
    @import url('../sass/_pagination.scss');
</style>
