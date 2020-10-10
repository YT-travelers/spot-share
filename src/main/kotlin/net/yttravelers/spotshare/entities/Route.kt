package net.yttravelers.spotshare.entities

import javax.persistence.*

@Entity
class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null

    var name: String? = null

    @OneToMany(fetch = FetchType.EAGER, cascade= [CascadeType.ALL])
    @JoinColumn(name = "routeId")
    var details: MutableList<RouteDetail> = mutableListOf()
}