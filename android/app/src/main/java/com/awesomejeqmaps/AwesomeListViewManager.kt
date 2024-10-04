package com.awesomejeqmaps

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.bumptech.glide.Glide
import androidx.core.content.ContextCompat
import com.awesomejeqmaps.ListAdapter

data class ListItem(
    val title: String,
    val latitude: Double,
    val longitude: Double,
    val description: String,
    val image: String,
    val id: String
)

class AwesomeListViewManager : SimpleViewManager<RecyclerView>() {
    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: ListAdapter
    private var items: List<ListItem> = emptyList()
    private var selectedId: String? = null

    override fun getName(): String {
        return "AwesomeListView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): RecyclerView {
        recyclerView = RecyclerView(reactContext)
        recyclerView.layoutManager = LinearLayoutManager(reactContext, LinearLayoutManager.HORIZONTAL, false)
        adapter = ListAdapter(items)
        recyclerView.adapter = adapter
        return recyclerView
    }

    @ReactProp(name = "data")
    fun setData(view: RecyclerView, data: ReadableArray?) {
        val itemList = mutableListOf<ListItem>()
        data?.let {
            for (i in 0 until data.size()) {
                val map = data.getMap(i)
                val listItem = ListItem(
                    title = map?.getString("title") ?: "",
                    latitude = map?.getDouble("latitude") ?: 0.0,
                    longitude = map?.getDouble("longitude") ?: 0.0,
                    description = map?.getString("description") ?: "",
                    image = map?.getString("image") ?: "",
                    id = map?.getString("id") ?: ""
                )
                itemList.add(listItem)
            }
        }
        items = itemList
        adapter.updateData(items)
    }

    @ReactProp(name = "selectedId")
    fun setSelectedId(view: RecyclerView, id: String?) {
        selectedId = id

        UiThreadUtil.runOnUiThread {
            adapter.setSelectedId(id)

            val position = items.indexOfFirst { it.id == id }
            if (position != -1) {
                recyclerView.smoothScrollToPosition(position)
            }

            view.invalidate()
        }
    }

    private fun scrollToIndex(id: String?) {
        val position = items.indexOfFirst { it.id == id }
        if (position != -1) {
            (recyclerView.layoutManager as? LinearLayoutManager)?.let { layoutManager ->
                if (position < layoutManager.findFirstVisibleItemPosition() ||
                    position > layoutManager.findLastVisibleItemPosition()) {
                    recyclerView.scrollToPosition(position)
                }
            }
        }
    }

}

