import * as driver from '@/utils/methods/driver.methods';

import { mapBindMethods } from '@/utils/nuxtIntegrations'

export default function (context) {
  return {
    driver: mapBindMethods(context, driver),
  }
}
