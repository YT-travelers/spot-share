package net.yttravelers.spotshare.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import net.yttravelers.spotshare.entities.codes.BeanKindDiv
import javax.persistence.*

@Entity
@Table(name = "routeDetail")
class RouteDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var routeDetailId: Int? = null

    @Column(name = "`order`")
    var order: Int? = null

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "routeId")
    var route: Route? = null

    @ManyToOne
    @JoinColumns(
            JoinColumn(name="beanKindDiv", referencedColumnName="division"),
            JoinColumn(name="beanKindDivKey", referencedColumnName="divKey")
    )
    var beanKindDiv: BeanKindDiv? = null

    @OneToOne(mappedBy = "routeDetail")
    var routeDetailTourism: RouteDetailTourism? = null
}