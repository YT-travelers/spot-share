package net.yttravelers.spotshare.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.Table
import javax.persistence.*

@Entity
@Table(name = "routeDetailChecklist")
class RouteDetailChecklist {
    @Id
    var routeDetailId: Int? = null

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "routeDetailId")
    @MapsId
    lateinit var routeDetail: RouteDetail

    //TODO: 区分の設計
//    @Column(nullable = false)
//    var checkStatus: String? = null

    @Column(nullable = false)
    var checkContent: String? = null
}