// window.addEventListener('load', function () {

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

Vue.component('num-btn', {
    props: ['num', 'css_class'],
    template: `
            <div :class="'btn '+css_class" @click="$emit('append', num)">
                <div class="number">{{num}}</div>
            </div>
        `
})

var vm = new Vue({
    el: '#app',
    data: {
        // calculation:'15*98',
        // tempResult:'1470',
        calculation: '',
    },
    mounted() {
        let btns = document.querySelectorAll('.btn')
        for (btn of btns) {
            btn.addEventListener('click', function () {
                this.classList.add('animate')
                this.classList.add('resetappearanim')
            })
            btn.addEventListener('animationend', function () {
                this.classList.remove('animate')
            })
        }
    },
    methods: {
        append(value) {
            this.calculation += value.toString()
        },
        clear() {
            this.calculation = ''
        },
        getResult() {
            if (this.tempResult != '') {
                this.calculation = this.tempResult
            }
        },
        backspace() {
            this.calculation = this.calculation.slice(0, -1)
        }
    },
    computed: {
        tempResult: function () {
            if (this.calculation !== '' && !isNaN(this.calculation.slice(-1)) && this.calculation != this.result) {
                return this.result.toString()
            } else {
                return ''
            }
        },
        result() {
            if (!isNaN(this.calculation.slice(-1)))
                return eval(this.calculation)
            else
                return eval(this.calculation.slice(0, -1))
        },
        fontSize() {
            return 50 - (this.tempResult.length * 1.25)
        }
    },
    filters: {
        hugeNumber: (value) => {
            let parts = value.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return parts.join(".");
        },
        number: (value) => {
            return value.replaceAll('*', 'x')
        },
        format: (value) => {
            return value.replaceAll('x', ' x ').replaceAll('/', ' / ').replaceAll('+', ' + ').replaceAll('-', ' - ')
        }
    }
})
// })