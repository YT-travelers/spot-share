package net.yttravelers.spotshare.entities

import javax.persistence.*

@Entity
@Table(name = "route")
class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var routeId: Int? = null

    @Column(name = "name")
    var routeName: String? = null

    @OneToMany(fetch = FetchType.EAGER, cascade= [CascadeType.ALL],  mappedBy = "route")
    var routeDetails: MutableList<RouteDetail> = mutableListOf()
}