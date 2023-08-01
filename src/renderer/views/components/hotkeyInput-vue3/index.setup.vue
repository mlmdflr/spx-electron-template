<template>
    <div class="shortcut-key-input-father">
        <div
            ref="dom"
            class="shortcut-key-input"
            :class="{ 'shortcut-key-input-overflow': multiple }"
            tabindex="0"
            @focus="handleFocus"
            @blur="focus = false"
            @keydown="handleKeydown"
        >
            <template
                v-if="(typeof hotkey === 'string' && hotkey) || (typeof hotkey !== 'string' && ((hotkey as Set<string>)?.size) > 0)"
            >
                <template v-if="multiple && hotkey && typeof hotkey !== 'string'">
                    <template v-for="(item, index) in hotkey.keys()" :key="index">
                        <span>
                            {{ item }}
                            <i @click="handleDeleteKey(item as string)"></i>
                        </span>
                    </template>
                </template>
                <template v-else>
                    <span>
                        {{ hotkey }}
                        <i @click="handleDeleteKey(hotkey as string)"></i>
                    </span>
                </template>
            </template>
            <div v-else class="placeholder">
                <p>{{ placeholder }}</p>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
function isBlank(o: string): boolean {
    if (!isNull(o)) return new RegExp('^[ ]+$').test(o)
    return true
}

function isNull(o: unknown): boolean {
    return o === '' || o === undefined || o === null || o === 'undefined' || o === 'null';
}

function getShortcutName(e: KeyboardEvent) {
    let arr = [];
    let hasPrimaryKey = false;
    if (e.altKey) arr.push('Alt');
    if (e.ctrlKey) arr.push('Ctrl');
    if (e.metaKey) arr.push('Cmd');
    if (e.shiftKey) arr.push('Shift');
    switch (true) {
        case e.code.startsWith('Digit'):
            arr.push(e.code.replace('Digit', ''));
            hasPrimaryKey = true;
            break;
        case e.code.startsWith('Key'):
            arr.push(e.code.replace('Key', ''));
            hasPrimaryKey = true;
            break;
        case e.code === 'Backquote':
            arr.push('`');
            hasPrimaryKey = true;
            break;
        case e.code === 'Escape':
            arr.push('Esc');
            hasPrimaryKey = true;
            break;
        case e.code === 'BracketLeft':
            arr.push('[');
            hasPrimaryKey = true;
            break;
        case e.code === 'BracketRight':
            arr.push(']');
            hasPrimaryKey = true;
            break;
        case e.code === 'Comma':
            arr.push(',');
            hasPrimaryKey = true;
            break;
        case e.code === 'Period':
            arr.push('.');
            hasPrimaryKey = true;
            break;
        case e.code === 'Slash':
            arr.push('/');
            hasPrimaryKey = true;
            break;
        case e.code === 'ArrowRight':
            arr.push('Right');
            hasPrimaryKey = true;
            break;
        case e.code === 'ArrowLeft':
            arr.push('Left');
            hasPrimaryKey = true;
            break;
        case e.code === 'ArrowUp':
            arr.push('Up');
            hasPrimaryKey = true;
            break;
        case e.code === 'ArrowDown':
            arr.push('Down');
            hasPrimaryKey = true;
            break;
        case [
            'F1',
            'F2',
            'F3',
            'F4',
            'F5',
            'F6',
            'F7',
            'F8',
            'F9',
            'F10',
            'F11',
            'F12',
            'Space',
            'Backspace',
            'Enter'
        ].includes(e.code):
            arr.push(e.code);
            hasPrimaryKey = true;
            break;
    }
    if (arr.length <= 1 || !hasPrimaryKey) return '';
    return arr.join(' + ');
}
</script>


<script setup  lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Array, Set],
        default: null
    },
    multiple: {
        type: Boolean,
        default: false
    },
    max: {
        type: Number,
        default: null
    },
    placeholder: {
        type: String,
        default: 'Please Input'
    }
})

const emit = defineEmits(['update:modelValue', 'change'])

let hotkey = props.modelValue
    ? ref(props.modelValue)
    : props.multiple
        ? ref(new Set<string>())
        : ref('');
if (typeof props.modelValue !== 'string' && Array.isArray(props.modelValue)) {
    if (props.multiple && props.modelValue.length > 0) hotkey = ref(new Set<string>(props.modelValue as string[]));
    else {
        hotkey = ref('');
        console.error('multiple = false, modelValue type not [] , Please use String');
    }
} else if (typeof props.modelValue !== 'string' && !props.multiple) {
    hotkey = ref('');
    console.error('multiple = false, modelValue type not Set , Please use String');
}

if (!props.multiple) {
    if (!props.max) {
        console.error('not multiple , max is invalid !');
    }
} else {
    if (props.max <= 0) {
        console.warn('max defaults is 3 , Please set');
    }
}
let focus = ref(false);
const dom = ref();
const handleKeydown = (e: KeyboardEvent) => {
    if (props.multiple) {
        if (!props.max && (hotkey.value as Set<String>).size < 3) {
            if (!isBlank(getShortcutName(e))) (hotkey.value as Set<String>).add(getShortcutName(e));
        } else {
            if ((hotkey.value as Set<String>).size < props.max) { if (!isBlank(getShortcutName(e))) (hotkey.value as Set<String>).add(getShortcutName(e)); }
            else
                dom.value.blur();
        }
    } else {
        if (!isBlank(getShortcutName(e))) hotkey.value = getShortcutName(e);
    }
};
const handleDeleteKey = (e: string) => {
    if (props.multiple) {
        (hotkey.value as Set<string>).delete(e);
        return;
    }
    hotkey.value = '';
};
const handleFocus = () => {
    if (props.multiple) {
        focus.value = false;
        if (!props.max && (hotkey.value as Set<String>).size < 3) {
            dom.value.focus();
        } else {
            if ((hotkey.value as Set<String>).size < props.max) {
                dom.value.focus();
            } else dom.value.blur();
        }
    } else if (!hotkey.value) focus.value = true;
};
watch(
    hotkey,
    (e) => {
        if (props.multiple) {
            focus.value = false;
        } else {
            if (!e) focus.value = true;
            else focus.value = false;
        }
        emit('update:modelValue', e);
        emit('change', e);
    },
    { deep: true }
);
watch(
    () => props.modelValue,
    () => {
        hotkey.value = props.modelValue;
    },
    { deep: true }
);

</script>


<style lang='scss' scoped>
@import "./scss/index";
</style>