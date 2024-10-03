package com.awesomejeqmaps

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.google.android.gms.maps.MapView
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions

class AwesomeJeqMapsViewManager : SimpleViewManager<MapView>() {
    private var googleMap: com.google.android.gms.maps.GoogleMap? = null

    override fun getName(): String {
        return "AwesomeJeqMapsView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): MapView {
        val mapView = MapView(reactContext)
        mapView.onCreate(null)
        mapView.getMapAsync { googleMap ->
            this.googleMap = googleMap

            googleMap?.let { map ->
                addMarkersToMap(map, pendingMarkerData)
            }
        }
        return mapView
    }

    private var pendingMarkerData: ReadableArray? = null

    @ReactProp(name = "markerData")
    fun setMarkerData(view: MapView, markerData: ReadableArray?) {
        if (googleMap != null) {
            addMarkersToMap(googleMap!!, markerData)
        } else {
            pendingMarkerData = markerData
        }
    }

    private fun addMarkersToMap(map: com.google.android.gms.maps.GoogleMap, markerData: ReadableArray?) {
        if (markerData == null) return
        map.clear()

        for (i in 0 until markerData.size()) {
            val marker = markerData.getMap(i)
            val position = LatLng(marker?.getDouble("latitude") ?: 0.0, marker?.getDouble("longitude") ?: 0.0)
            val title = marker?.getString("title") ?: ""
            val description = marker?.getString("description") ?: ""
            map.addMarker(MarkerOptions().position(position).title(title).snippet(description))
        }
    }
}
