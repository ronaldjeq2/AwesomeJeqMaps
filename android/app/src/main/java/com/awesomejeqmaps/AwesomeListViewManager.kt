package com.awesomejeqmaps

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

data class ListItem(val title: String, val image: String)

class AwesomeListViewManager : SimpleViewManager<RecyclerView>() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var reactContext: ThemedReactContext
    private var items: List<ListItem> = emptyList()

    override fun getName(): String {
        return "AwesomeListView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): RecyclerView {
        this.reactContext = reactContext

        recyclerView = RecyclerView(reactContext)
        recyclerView.layoutManager = LinearLayoutManager(reactContext, LinearLayoutManager.HORIZONTAL, false)
        recyclerView.adapter = ListAdapter(items, reactContext)

        return recyclerView
    }

    @ReactProp(name = "data")
    fun setData(view: RecyclerView, data: ReadableArray?) {
        data?.let {
            items = data.toArrayList().map { obj ->
                val map = obj as? HashMap<*, *>
                ListItem(
                    title = map?.get("title") as? String ?: "",
                    image = map?.get("image") as? String ?: ""
                )
            }
            recyclerView.adapter = ListAdapter(items, reactContext)
        }
    }

    class ListAdapter(private val items: List<ListItem>, private val context: Context) :
        RecyclerView.Adapter<ListAdapter.ViewHolder>() {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val view = LayoutInflater.from(parent.context)
                .inflate(R.layout.list_item_horizontal, parent, false)
            return ViewHolder(view)
        }

        override fun onBindViewHolder(holder: ViewHolder, position: Int) {
            val item = items[position]
            holder.title.text = item.title
            Glide.with(context).load(item.image).into(holder.image)
        }

        override fun getItemCount(): Int {
            return items.size
        }

        class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
            val title: TextView = itemView.findViewById(R.id.item_title)
            val image: ImageView = itemView.findViewById(R.id.item_image)
        }
    }
}
