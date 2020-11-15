package net.yttravelers.spotshare.entities

import javax.persistence.*

@Entity
class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    var routeId: Int? = null

    @Column(name = "name")
    var routeName: String? = null

    @OneToMany(fetch = FetchType.EAGER, cascade= [CascadeType.ALL])
    @JoinColumn(name = "routeId")
    var routeDetails: MutableList<RouteDetail> = mutableListOf()
}