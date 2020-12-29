package net.yttravelers.spotshare.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.Table
import javax.persistence.*

@Entity
@Table(name = "routeDetailMemo")
class RouteDetailMemo {
    @Id
    var routeDetailId: Int? = null

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "routeDetailId")
    @MapsId
    lateinit var routeDetail: RouteDetail

    @Column(nullable = false)
    var memoContent: String? = null
}