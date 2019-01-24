# Vue-Phoenix

[![npm](https://img.shields.io/npm/v/@vip30/vue-phoenix.svg)](https://www.npmjs.com/package/@vip30/vue-phoenix)
[![Build Status](https://travis-ci.com/vip30/vue-phoenix.svg?branch=master)](https://travis-ci.com/vip30/vue-phoenix)
[![Coverage](https://codecov.io/gh/vip30/vue-phoenix/branch/master/graph/badge.svg)](https://codecov.io/gh/vip30/vue-phoenix)
[![CodeFactor](https://www.codefactor.io/repository/github/vip30/vue-phoenix/badge/master)](https://www.codefactor.io/repository/github/vip30/vue-phoenix/overview/master)
[![Known Vulnerabilities](https://snyk.io/test/github/vip30/vue-phoenix/badge.svg)](https://snyk.io/test/github/vip30/vue-phoenix)

Vue-Phoenix is a [Phoenix](https://github.com/phoenixframework/phoenix) integration for Vuejs. It can support either [vue-class-component](https://github.com/vuejs/vue-class-component) or JS single file component. 

[Live Demo](https://vip30.github.io/vue-phoenix/)

## Description

It provides the bridge to consume phoenix

## License

MIT License

## Install

```bash
npm i -S @vip30/vue-phoenix
```

## Usage

```typescript
// In main.ts / main.js
import VuePhoenix from '@vip30/vue-phoenix'
Vue.use(
  new VuePhoenix('<path>', {
    token: '<secret-token>'
  })
)
```

```typescript
// In ts component
import { Obey } from '@vip30/vue-phoenix'

@Obey('shout', 'room:lobby')
public shout(payload: any) {
    console.log(payload)
}
```

```javascript
// In js component
new Vue({
  phoenix: {
    'room:lobby': {
      shout: function(payload) {
        console.log(payload)
      }
    }
  }
})
```

In case, the channel name can be a non-static string. You can set your own channel on your code.

## Example:

```typescript
// In ts component
import { Obey } from '@vip30/vue-phoenix'

// Without the room name, it will use the component channel
@Obey('shout')
public shout(payload: any) {
  console.log(payload)
}

public mounted() {
  this.$initChannel('room-lobby')
}
```

```javascript
// In js component
new Vue({
  phoenix: {
    shout: function(payload) {
      console.log(payload)
    }
  },
  mounted: function() {
    this.$initChannel('room-lobby')
  }
})
```

Also you can use this.\$channelHelper.initInstance to create your own [channel](https://hexdocs.pm/phoenix/js/)

## Example:

```typescript
public mounted() {
  const channel = this.$channelHelper.initInstance('room:xxx')
  channel.join()
}
```

You can view example at [here](https://github.com/vip30/vue-phoenix/tree/master/example)
