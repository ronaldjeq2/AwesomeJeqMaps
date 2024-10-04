package com.awesomejeqmaps

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AwesomeListViewModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AwesomeListViewModule"
    }

    @ReactMethod
    fun scrollToIndex(index: Int) {
    }
}
