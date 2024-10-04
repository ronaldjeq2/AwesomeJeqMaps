package com.awesomejeqmaps

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide

class ListAdapter(private var items: List<ListItem>) :
    RecyclerView.Adapter<ListAdapter.ViewHolder>() {

    private var selectedId: String? = null

    fun updateData(newItems: List<ListItem>) {
        items = newItems
        notifyDataSetChanged()
    }

    fun setSelectedId(id: String?) {
        val oldPosition = items.indexOfFirst { it.id == selectedId } // Obtener la posición anterior
        selectedId = id
        val newPosition = items.indexOfFirst { it.id == selectedId } // Obtener la nueva posición

        if (oldPosition != -1) notifyItemChanged(oldPosition)
        if (newPosition != -1) notifyItemChanged(newPosition)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.list_item_horizontal, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = items[position]
        holder.title.text = item.title
        Glide.with(holder.image.context).load(item.image).into(holder.image)

        if (item.id == selectedId) {
            holder.itemView.setBackgroundColor(ContextCompat.getColor(holder.itemView.context, R.color.highlight))
        } else {
            holder.itemView.setBackgroundColor(android.graphics.Color.TRANSPARENT)
        }
    }

    override fun getItemCount(): Int {
        return items.size
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val title: TextView = itemView.findViewById(R.id.item_title)
        val image: ImageView = itemView.findViewById(R.id.item_image)
    }
}